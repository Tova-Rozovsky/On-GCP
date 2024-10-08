import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'achaiotbaam@gmail.com',
    pass: 'guyq iirx afyv eopp'
  },
  tls: {
    rejectUnauthorized: false
  }
});
function sendHelpRequestEmail(userEmail) {

  let mailOptions = {
    from: 'achaiotbaam@gmail.com',
    to: userEmail,
    subject: 'עדכון לגבי בקשתך:)',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
        <p style="font-size: 18px;">הי אחותי!</p>
        <p>איך את?</p>
        <p>שמחות לבשר לך שבקשתך נלקחה ע"י אחות אחרת וכבר נעדכן אותך מה איתו...</p>
        <p>לכל שאלה או עזרה ניתן לפניות למייל <a href="mailto:achaiotbaam@gmail.com">achaiotbaam@gmail.com</a></p>
        <p>צוות אחיות בע"מ</p>
        <img src="cid:unique@nodemailer.com" alt="תמונה">
      </div>
    `,
    attachments: [{
      filename: 'the_logo.png',
      path: 'C:\\Users\\Shoshana\\פרויקט סופי\\finalProject\\server\\the logo.png',
      cid: 'unique@nodemailer.com' 
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); 
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


function sendVolunteerEmail(userEmail) {

  let mailOptions = {
    from: 'achaiotbaam@gmail.com',
    to: userEmail,
    subject: 'תודה:)',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
        <p style="font-size: 18px;">הי אחותי!</p>
        <p>איך את?</p>
        <p>תודה רבה על העזרה.... נשמח לפגושך שוב</p>
        <p>לכל שאלה או עזרה ניתן לפניות למייל <a href="mailto:achaiotbaam@gmail.com">achaiotbaam@gmail.com</a></p>
        <p>צוות אחיות בע"מ</p>
        <img src="cid:unique@nodemailer.com" alt="תמונה">
      </div>
    `,
    attachments: [{
      filename: 'the_logo.png',
      path: 'C:\\Users\\Shoshana\\פרויקט סופי\\finalProject\\server\\the logo.png',
      cid: 'unique@nodemailer.com' 
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); 
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


function sendPasswordChangeEmail(userEmail, otp) {

  let mailOptions = {
    from: 'achaiotbaam@gmail.com',
    to: userEmail,
    subject: 'שחזור סיסמה באתר',
    html: `
              <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
            <p>שלום!</p>
            <p>בקשת שינוי סיסמה נקלטה במערכת.</p>
            <p>הקוד לשחזור הסיסמה שלך הוא: <strong>${otp}</strong></p>
            <p>הזן את הקוד בדף שחזור הסיסמה באתר כדי להמשיך בתהליך.</p>
            <p>בברכה,</p>
            <p>צוות האתר</p>
        </div>
          `
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); 
    } else {
      console.log('Email sent: ' + info.response); 
    }
  });
}


  export { sendHelpRequestEmail, sendPasswordChangeEmail,sendVolunteerEmail }


