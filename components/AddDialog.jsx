"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function AddDialog({ mutate, url }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/${url}`, {
        method: "POST",
        body: JSON.stringify({
          fullName: fullName.toLowerCase(),
          email: email.toLowerCase(),
          phoneNumber: phoneNumber.toLowerCase(),
        }),
      });
      if (res.ok) {
        toast({
          title: "success",
          description: "Accepted has been created!",
        });
      } else if (res.status === 400) {
        toast({
          title: "Failed",
          description: "The given email already Exist!",
        });
      }

      mutate();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Database Error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="w-[50%]">
        <DialogHeader>
          <DialogTitle>Add </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start space-y-4"
        >
          <div className="flex flex-col items-start justify-start w-full space-y-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input
              value={fullName}
              id="fullName"
              className="col-span-3"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full space-y-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full space-y-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
