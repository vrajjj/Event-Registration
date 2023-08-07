function doGet() {
    return HtmlService.createHtmlOutputFromFile('Page');
}

function processForm(registrationType, checkInTogether, adults, children, kids, amount, participants, email) { 
    // Generating the reference number
    var referenceNumber = 'REF-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    
    // Here you can write the logic to handle the form data
    var sheet = SpreadsheetApp.openById("19sh5IfChjom2QnX_2EnhE-NLyPXOqlvlJTH-eiyPHj4").getActiveSheet();

    // Example of writing the basic data
    sheet.appendRow([registrationType, checkInTogether, adults, children, kids, "€" + amount, email]); // Added email and new fields here

    // Example of writing the participants
    participants.forEach(function (participant) {
        sheet.appendRow([participant.type, participant.firstName, participant.lastName, participant.email]);
    });

    // Send email confirmation
    var subject = 'Registration Confirmation';
    var message = 
        'Thank You!\n\n' +
        'Your registration has been submitted successfully.\n' +
        'Total Amount: €' + amount + '\n' +
        'Reference Number: ' + referenceNumber + '\n' + // Including the reference number
        'Please transfer the total amount via PayPal to this ID: paypal.me/GujaratiFranconia\n';
        
    MailApp.sendEmail({
        to: email,
        subject: subject,
        body: message
    });

    return referenceNumber; // Return the reference number to the client-side
}
