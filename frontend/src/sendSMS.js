const myHeaders = new Headers();
myHeaders.append("Authorization", "App c9ecf0786292a16fa8671605d96bc296-bc6da9b6-907c-4328-9e2a-d0601b55ffd4");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

const raw = JSON.stringify({
    "messages": [
        {
            "destinations": [{"to":"237650641633"}],
            "from": "ServiceSMS",
            "text": "Congratulations on sending your first message.\nGo ahead and check the delivery report in the next step."
        }
    ]
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};


fetch("https://9lmmqr.api.infobip.com/sms/2/text/advanced", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
