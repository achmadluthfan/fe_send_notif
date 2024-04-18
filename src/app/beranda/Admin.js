"use client";
import { useContext, useState, useEffect } from "react";
import { NotifContext } from "@/service/notification/NotifProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashboardAdmin = ({ auth }) => {
  const {
    notificationList,
    getAllNotification,
    addNotification,
    getAllSubscribers,
    allSubs,
  } = useContext(NotifContext);

  useEffect(() => {
    const init = async () => {
      await getAllNotification();
    };
    init();
  }, []);

  const [newNotif, setNewNotif] = useState({
    title: "",
    body: "",
  });

  return (
    <section className="w-dvw h-dvh px-5 py-3 ">
      <div className=" max-w-[600px] h-fit mx-auto">
        <div className="flex flex-col gap-y-3">
          <Card className="bg-primary">
            <CardHeader className=" items-center space-y-0 pb-2">
              <CardTitle className="text-3xl font-semibold text-primary-foreground">
                Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white text-center">
                Website Pionir Gadjah Mada 2024
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className="text-lg font-medium underline cursor-pointer"
                onClick={async () => {
                  await getAllSubscribers();
                }}
              >
                Total Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allSubs.length}</div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-[600px] flex flex-col gap-y-3">
          <Tabs defaultValue="list-notification" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add_notification">
                Add Notification
              </TabsTrigger>
              <TabsTrigger value="list-notification">
                List Notification
              </TabsTrigger>
            </TabsList>
            <TabsContent value="add_notification">
              <Card>
                <CardHeader>
                  <CardTitle>Add Notification</CardTitle>
                  <CardDescription>
                    Add notification to your database. Click save when youre
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="name"
                      value={newNotif.title}
                      onChange={(e) => {
                        setNewNotif({
                          ...newNotif,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Description</Label>
                    <Input
                      id="username"
                      value={newNotif.body}
                      onChange={(e) => {
                        setNewNotif({
                          ...newNotif,
                          body: e.target.value,
                        });
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={async () => {
                      await addNotification(newNotif);
                      setNewNotif({ title: "", body: "" });
                    }}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="list-notification">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>List Notification</CardTitle>
                  <CardDescription>
                    Recent notification from database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="grid grid-cols-5 w-full">
                        <TableHead className="h-7">Title</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="relative">
                      {notificationList.map((item, index) => {
                        return (
                          <NotificationItem
                            key={index}
                            id={item.id}
                            title={item.title}
                            body={item.body}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DashboardAdmin;

const NotificationItem = ({ id, title, body }) => {
  const { removeNotification, sendNotification } = useContext(NotifContext);
  return (
    <TableRow className="flex w-full">
      <TableCell className="w-[50%] sm:w-[70%]">
        <div className="font-medium">{title}</div>
        <div className=" text-sm text-muted-foreground inline">{body}</div>
      </TableCell>
      <TableCell className="flex gap-x-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-blue-500">Send</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently{" "}
                <span className="font-medium text-black">
                  send your notification
                </span>{" "}
                to users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => sendNotification({ title, body })}
              >
                Send Notification
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently{" "}
                <span className="font-medium text-black">
                  delete your notification
                </span>{" "}
                from your server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={async () => await removeNotification({ id })}
              >
                Delete Notification
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
