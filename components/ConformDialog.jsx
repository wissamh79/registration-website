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
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ConformDialog({ setConform }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/conform`, {
        method: "POST",
        body: JSON.stringify({
          email: email.toLowerCase(),
          phoneNumber: phoneNumber.toLowerCase(),
        }),
      });
      if (res.ok && res.status === 200) {
        toast({
          title: "Success",
          description: "Accepted has been created!",
        });
        setConform(true);
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", email);
      } else if (res.status === 400) {
        toast({
          title: "Failed",
          description: "All fields are required!",
        });
        setConform(false);
      } else {
        toast({
          title: "Failed",
          description: "You haven't been Accepted",
        });
        setConform(false);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something Went Wrong",
      });
      setConform(false);
    }
  };
  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]">Conform </Button>
      </DialogTrigger>
      <DialogContent className="w-[50%]">
        <DialogHeader>
          <DialogTitle>Conform</DialogTitle>
          <DialogDescription>
            Make sure to Register Before You Conform.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start space-y-4"
        >
          <div className="flex flex-col items-start justify-start w-full space-y-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              required
              min="11"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full space-y-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3"
              required
              min="11"
              max="15"
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
