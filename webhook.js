function sendToGoogleChat(e) {
  // 1. Paste your Webhook URL here
  var webhookUrl = "https://chat.googleapis.com/v1/spaces/AAAAXXXX/messages?key=AIzaSyXXX&token=XXXX";

  // 2. Extract specific data (Adjust the numbers [1], [2] based on your sheet columns)
  var responses = e.values; 
  var personName = responses[1]; // Usually Column B is the first question
  var timestamp = responses[0];  // Column A is always the date/time
  var otherDetails = responses.slice(2).join(" | "); // Everything else from Column C onwards

  // 3. Create a Professional Card Layout
  var payload = {
    "cards": [{
      "header": {
        "title": "New Entry: " + personName,
        "subtitle": "Submitted at: " + timestamp,
        "imageUrl": "https://fonts.gstatic.com/s/i/googlematerialicons/person/v11/24px.svg"
      },
      "sections": [{
        "widgets": [
          {
            "textParagraph": {
              "text": "<b>Details:</b> " + otherDetails
            }
          },
          {
            "buttons": [{
              "textButton": {
                "text": "OPEN GOOGLE SHEET",
                "onClick": {
                  "openLink": {
                    "url": SpreadsheetApp.getActiveSpreadsheet().getUrl()
                  }
                }
              }
            }]
          }
        ]
      }]
    }]
  };

  // 4. Send the request
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(webhookUrl, options);
}
