/************* CLASES ************/
class Storage {
  static saveMessage(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  static getMessages() {
    return localStorage.getItem("messages")
      ? JSON.parse(localStorage.getItem("messages"))
      : [];
  }
  static removeMessages() {
    localStorage.removeItem("messages");
  }
}

class Message {
  static addMessage(message, fecha, likes = 0, id) {
    var newMessage = {
      message: message,
      fecha: fecha,
      likes: likes,
      id: id,
    };
    messages.push(newMessage);
    Storage.saveMessage(messages);
  }

  static removeMessage(filter) {
    var messages = Storage.getMessages();
    Storage.removeMessages();
    return (messages = messages.filter((element) => element.id !== filter));
  }

  static likeMessage(filter) {
    var messages = Storage.getMessages();
    let myObj = messages.find((el) => (el.id = filter));
    myObj.likes += 1;
    return messages;
  }

  static sortArrayOf(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }
}

class UI {
  static displayMEssages(messages) {
    let result = "";
    messages.forEach((message) => {
      result += `
        <!-- Single messsage -->
        <div class="card ">
        <div class="center__feed__top">
                    <img src="/styles/IMG/profilePic.jpeg" alt="Profile picture" />
                    <div>
                        <div class="center__feed__name">Luis López</div>
                        <span class="center__feed__position">Desarrollador Web Imagine Apps</span> <br>
                        <span> ${message.fecha} | <i class="fa fa-globe" aria-hidden="true"></i></span>
                    </div>
                    <div class="center__feed__edit">
                        <i class="fa fa-trash remove-message link" data-id=${message.id}></i>
                    </div>
                </div>
                <div class="center__feed__content">
                    <div>${message.message}</div>
                    <div class="center__feed__likes">Tu publicaciòn le ha gustado a <strong>${message.likes}</strong> personas <i
                            class="fas fa-thumbs-up"></i></div>
                </div>
                <div class="center__feed__footer">
                    <div class="link" class="like-comment" onclick="likeMessage(${message.id})" >
                        <span><i class="fas fa-thumbs-up"></i></span>
                        <span>Recomendar</span>
                    </div>
                    <div class="link">
                        <span><i class="fa fa-comment" aria-hidden="true"></i></span>
                        <span>Comentar</span>
                    </div>
                    <div class="link">
                        <span><i class="fa fa-mail-forward" aria-hidden="true"></i></i></span>
                        <span>Compartir</span>
                    </div>
                    <div class="link">
                        <span><i class="fa fa-send" aria-hidden="true"></i></span>
                        <span>Enviar</span>
                    </div>
                    </div>
                    </div>
            <!--------------- end of single message --------------->
        `;
    });
    messagesDOM.innerHTML = result;
  }
}

/************* APP ************/

//Importar el DOM
const messagesDOM = document.querySelector(".center__feed");

//Importar mensajes desde el LS
var messages = Storage.getMessages();

//Mostrar mensajes en el DOM
UI.displayMEssages(messages);

//Almacenar nuevo mensaje en LS
var input = document.getElementById("userInput");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    var userInput = document.getElementById("userInput").value;
    var date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;
    var id = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
    Message.addMessage(String(userInput), String(date), 0, id);
    document.getElementById("userInput").value = "";
    sortByDate("desc");
    UI.displayMEssages(messages);
  }
});

//Elimina un mensaje del LS y el DOM
messagesDOM.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-message")) {
    let removeMessage = event.target;
    let filter = removeMessage.dataset.id;
    messages = Message.removeMessage(filter);
    Storage.saveMessage(messages);
    UI.displayMEssages(messages);
  }
});

//Like un mensaje
function likeMessage(filter) {
  messages = Message.likeMessage(filter);
  Storage.saveMessage(messages);
  UI.displayMEssages(messages);
}

//Organiza por fecha y actualiza el DOM
function sortByDate(sort) {
  messages.sort(Message.sortArrayOf("id", sort));
  Storage.saveMessage(messages);
  Storage.getMessages();
  UI.displayMEssages(messages);
}
