"use client";

import { useContext, useState, createContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
const axios = require("axios").default;
axios.defaults.baseURL = "http://localhost:1337/api";
export const NotifContext = createContext();

const NotifProvider = (props) => {
  const { auth } = useContext(AuthContext);

  const requestTemplate = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.jwt,
    },
  };

  const [notificationList, setNotificationList] = useState([]);

  const sendNotification = async ({ title, body }) => {
    try {
      let response = await axios.post(
        "/send-notification",
        {
          data: {
            title: title,
            body: body,
          },
        },
        requestTemplate
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllNotification = async () => {
    try {
      let response = await axios.get("/notifications", { ...requestTemplate });
      const newNotif = [];
      for (const notif of response.data.data) {
        newNotif.push({
          id: notif.id,
          title: notif.attributes.title,
          body: notif.attributes.body,
        });
      }
      // console.log(response);
      setNotificationList(() => newNotif);
    } catch (e) {
      console.log("Erron on", e);
    }
  };

  const removeNotification = async ({ id }) => {
    try {
      let response = await axios.delete(
        `/notifications/${id}`,
        requestTemplate
      );
      await getAllNotification();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const addNotification = async ({ title, body }) => {
    const date = new Date();
    console.log(title, body);
    console.log(requestTemplate);
    try {
      let response = await axios.post(
        "/notifications",
        {
          data: {
            title: title,
            body: body,
            publishedAt: date,
          },
        },
        requestTemplate
      );
      await getAllNotification();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const [allSubs, SetAllSubs] = useState([]);

  const getAllSubscribers = async () => {
    try {
      let response = await axios.get("/subscribers", { ...requestTemplate });
      const allSubsData = [];
      for (const sub of response.data.data) {
        allSubsData.push({
          id: sub.id,
        });
      }
      SetAllSubs(() => allSubsData);
    } catch (e) {
      console.log("Erron on", e);
    }
  };

  const value = {
    notificationList,
    getAllNotification,
    removeNotification,
    addNotification,
    sendNotification,
    getAllSubscribers,
    allSubs,
  };
  return (
    <NotifContext.Provider value={value}>
      {props.children}
    </NotifContext.Provider>
  );
};

export default NotifProvider;
