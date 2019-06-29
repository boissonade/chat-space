  $(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var content = message.content ? `${ message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
      <div class="upper-message__user-name">
      ${message.user_name}
      </div>
      <div class="upper-message__date">
      ${message.date}
      </div>
    </div>
    <div class="lower-meesage">
        <p class="lower-message__content">
        ${content}
        </p>
        ${img}
    </div>
                  </div>`
    return html;
    }
    function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this);
      var url = (window.location.href);
      $.ajax({  
        url: url,
        type: 'POST',
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset(); //input内のメッセージを消しています。
        scrollBottom();
      })
      .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(data){
        $('.form__submit').prop('disabled', false);　//ここで解除している
      })
    }) 
    // 自動更新はここから。 
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      var group_id = $('.left-header__title').data("group-id");
      var new_url = "/groups/" + group_id + "/api/messages";
      // var group_id = $(".group").data("group-id");
      $.ajax({ //ajax通信で以下のことを行う
        url: new_url, //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.messages').append(insertHTML);//メッセージを追加
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
  })
