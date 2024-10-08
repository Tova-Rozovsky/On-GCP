import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { IoSend } from "react-icons/io5";
import { addRequest } from '../httpController';
import './helpRequest.css';

const HelpRequestPage = () => {
    const location = useLocation();
    const userId = location.state.userId;

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [requestType, setRequestType] = useState('');
    const [requestDate, setRequestDate] = useState('');

    const amountMeals = watch("amountMeals");

    useEffect(() => {
        const socket = io('http://localhost:8082');

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const onSubmit = async (data) => {
        try {
            reset();
console.log(requestDate)
            let body = {
                requests: {
                    userId: userId,
                    requestStatus: "המתנה",
                    requestType: data.requestType,
                    requestDate: requestDate 
                }
            };

            switch (data.requestType) {
                case "ארוחה":
                    body.meals = {
                        amountMeals: data.amountMeals,
                        mealType: data.mealType
                    };
                    break;
                case "בייביסיטר":
                    body.babysitter = {
                        numberOfChildren: data.numberOfChildren,
                        babysittingHours: data.babysittingHours
                    };
                    break;
                case "נקיון":
                    body.cleaning = {
                        cleaningHours: data.cleaningHours,
                        cleaningDay: data.cleaningDay
                    };
                    break;
                case "קניות":
                    body.shopping = {
                        shoppingList: data.shoppingList
                    };
                    break;
                case "אוזן קשבת":
                    body.support = {
                        supportCall: data.supportCall
                    };
                    break;
                default:
                    throw new Error('Unsupported request type');
            }

            const responseData = await addRequest(body);
            alert("הבקשה נוספה בהצלחה אנא המתינה לפרטי התקשרות ");
            console.log('Request added successfully:', responseData);

            const socket = io('http://localhost:8082');
            socket.emit('postRequest', body);

        } catch (error) {
            console.error('Error adding request:', error.message);
        }
    };

    const handleRequestTypeChange = (event) => {
        setRequestType(event.target.value);
    };

    const handleDateChange = (event) => {
        setRequestDate(event.target.value);
    };

    return (
        <>
            <h1>פניית עזרה</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    סוג הבקשה:
                    <select {...register("requestType", { required: true })} onChange={handleRequestTypeChange}>
                        <option value="">בחר סוג בקשה</option>
                        <option value="ארוחה">ארוחה</option>
                        <option value="בייביסיטר">בייביסיטר</option>
                        <option value="נקיון">נקיון</option>
                        <option value="קניות">קניות</option>
                        <option value="אוזן קשבת">אוזן קשבת</option>
                    </select>
                    {errors.requestType && <span>שדה חובה</span>}
                </label>
                <br />

                {requestType === "ארוחה" && (
                    <>
                        <label>
                            כמות ארוחות:
                            <input
                                type="number"
                                {...register("amountMeals", {
                                    required: true,
                                    min: {
                                        value: 1,
                                        message: "הכמות המינימלית היא 1"
                                    },
                                    max: {
                                        value: 20,
                                        message: "הכמות המקסימלית היא 20"
                                    }
                                })}
                            />
                            {errors.amountMeals && <span>{errors.amountMeals.message}</span>}
                            {(amountMeals <= 0 || amountMeals > 20) && (
                                <span>אנא כתוב מספר בין 1 ל-20 כולל</span>
                            )}
                        </label>
                        <br />
                        <label>
                            סוג הארוחה:
                            <select {...register("mealType", { required: true })}>
                                <option value="">בחר סוג הארוחה</option>
                                <option value="פרווה">פרווה</option>
                                <option value="חלבי">חלבי</option>
                                <option value="בשרי">בשרי</option>
                            </select>
                            {errors.mealType && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "בייביסיטר" && (
                    <>
                        <label>
                            מספר ילדים:
                            <input type="number" {...register("numberOfChildren", { required: true })} />
                            {errors.numberOfChildren && <span>שדה חובה</span>}
                        </label>
                        <br />
                        <label>
                            מספר שעות בייביסיטר:
                            <input type="number" {...register("babysittingHours", { required: true })} />
                            {errors.babysittingHours && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "נקיון" && (
                    <>
                        <label>
                            מספר שעות נקיון:
                            <input type="number" {...register("cleaningHours", { required: true })} />
                            {errors.cleaningHours && <span>שדה חובה</span>}
                        </label>
                        <br />
                        <label>
                            יום נקיון:
                            <br />
                            <input type="text" {...register("cleaningDay", { required: true })} />
                            {errors.cleaningDay && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "קניות" && (
                    <>
                        <label>
                            רשימת מוצרים:
                            <textarea {...register("shoppingList", { required: true })} />
                            {errors.shoppingList && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                {requestType === "אוזן קשבת" && (
                    <>
                        <label>
                            נושא השיחה:
                            <textarea {...register("supportCall", { required: true })} />
                            {errors.supportCall && <span>שדה חובה</span>}
                        </label>
                        <br />
                    </>
                )}

                <label>
                    תאריך הבקשה:
                    <input type="date" name="requestDate" value={requestDate} onChange={handleDateChange} required />
                </label>
                <br />

                <button type="submit">שליחה <IoSend /></button>
            </form>
        </>
    );
};

export default HelpRequestPage;
