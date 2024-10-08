
import React from "react";
import './requestStyles.css'; 

const GenericRequest = ({ object }) => {
  const renderRequestDetails = () => {
    switch (object.requestType) {
      case 'בייביסיטר':
        return (
          <div>
            <h3>פרטי הבייביסיטר</h3>
            <p><strong>כמות ילדים:</strong> {object.numberOfChildren}</p>
            <p><strong>שעות :</strong> {object.babysittingHours}</p>
            
        
          </div>
        );
      case 'נקיון':
        return (
          <div>
            <h3>פרטי הניקיון</h3>
            <p><strong>שעות ניקוי</strong> {object.cleaningHours}</p>
            <p><strong>יום ניקוי</strong> {object.cleaningDay}</p>
          
          </div>
        );
      case 'קניות':
        return (
          <div>
            <h3>פרטי הקניות</h3>
            <p><strong>רשימת קניות:</strong> {object.shoppingList}</p>
           
          </div>
        );
      case 'אוזן קשבת':
        return (
          <div>
            <h3>פרטי התמיכה</h3>
            <p><strong>נושא השיחה:</strong> {object.supportCall}</p>
         
          </div>
        );
      case 'ארוחה':
        return (
          <div>
            <h3>פרטי הארוחה</h3>
            <p><strong>מספר מנות:</strong> {object.amountMeals}</p>
            <p><strong>סוג ארוחה:</strong> {object.mealType}</p>
           
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="generic-request">
      {renderRequestDetails()}
      <p><strong>כתובת:</strong> {object.address}</p>
      <p><strong>אזור:</strong> {object.region}</p>
    </div>
  );
};

export default GenericRequest;
