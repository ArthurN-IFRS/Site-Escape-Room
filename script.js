
/* Time */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

function updateDeviceTime() {
	var now = moment().add("hours", "minutes");
	deviceTime.innerHTML = now.format("h:mm");
}

setInterval(updateDeviceTime, 1000);
updateDeviceTime();

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('h:mm A');
}



/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

var respostas = ["20 de junho de 2013", "impa", "-4", "-2"];
var mensagens = ["<img src='https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/31267_DEF9FCE38114473C.jpeg?w=1200&h=675&crop=1' width = '230' height = '210'/>", "3", "4", "Fim de jogo"]
var dicas = ["Pesquisar o nome dela"];

var desafioAtual = 0;

function newMessage(e) {
	var input = e.target.input;

	if (input.value) {
		e.preventDefault();

		var text = input.value.trim().toLowerCase();

		var message = buildMessage(input.value);
		conversation.appendChild(message);
		animateMessage(message);

		if (text === respostas[desafioAtual]) {
			var resposta = buildMessage(mensagens[desafioAtual], "received");
			conversation.appendChild(resposta);

			desafioAtual++;
		}

		else if (text === "dica") {
			var dica = buildMessage(dicas[desafioAtual ], "received");
			conversation.appendChild(dica);
		}

		else
		{
			var erro = buildMessage("Você errou, tente novamente", "received");
			conversation.appendChild(erro);
		}
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMessage(text, type = "sent") {
	var element = document.createElement('div');

	element.classList.add('message', type);

	var inner = text +
		'<span class="metadata">' +
		'<span class="time">' + moment().format('h:mm A') + '</span>';

	if (type === "sent") {
		inner += '<span class="tick tick-animation">' +
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>';
	}

	inner += '</span>';

	element.innerHTML = inner;

	return element;
}

function animateMessage(message) {
	setTimeout(function() {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}