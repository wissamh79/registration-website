"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Logo from "@/assets/logo.svg";
import SearchBar from "./SearchBar";
import Paginate from "./Paginate";
import AddDialog from "./AddDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
export default function Accepted() {
  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `http://localhost:3000/api/attend`,
    fetcher
  );

  const [searchResult, setSearchResult] = useState(data);

  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const setData = async () => {
      setSearchResult(await data);
    };

    setData();
  }, [data]);
  //Paginate Calculations
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentUsers = searchResult?.slice(itemOffset, endOffset);

  // .sort((a, b) =>
  //   descending
  //     ? a.fullName < b.fullName
  //       ? 1
  //       : -1
  //     : a.fullName > b.fullName
  //     ? 1
  //     : -1
  // );
  const pageCount = Math.ceil(searchResult?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchResult?.length;

    setItemOffset(newOffset);
  };
  const session = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Image src={Logo} alt="logo" className=" h-[150px] w-[250px]" />
        <span className="loader" />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    redirect("/dashboard/login");
  }

  return (
    <section className="flex flex-col items-center justify-center w-[75%] h-full px-6 ">
      <div className="flex   w-[85%]  items-center justify-between  py-2">
        <SearchBar
          data={data}
          setSearchResult={setSearchResult}
          className="w-[50%]"
        />

        <AddDialog url={"attend"} mutate={mutate} />
      </div>

      <div className="flex flex-col  w-[85%] h-full items-center justify-center  py-2 ">
        <Table>
          <TableCaption>A list of Attendance</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=""> Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead> Phone</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers?.length ? (
              currentUsers?.map((user, index) => (
                <TableRow key={user?._id + index}>
                  <TableCell className="font-medium ">
                    {" "}
                    {user?.fullName ? user?.fullName : "No Name"}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.phoneNumber}</TableCell>
                  <TableCell className="flex items-center justify-center space-x-4 text-right">
                    <EditDialog
                      url={"attend"}
                      id={user?._id}
                      mutate={mutate}
                      oldName={user?.fullName}
                      oldEmail={user?.email}
                      oldPhoneNumber={user?.phoneNumber}
                    />
                    <DeleteDialog
                      url={"attend"}
                      id={user?._id}
                      mutate={mutate}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className=" flex flex-col items-center justify-center w-full h-[400px]   px-4 py-2 rounded-xl text-center  ">
                <h2 className="text-lg font-medium text-gray-700 uppercase font-poppins dark:text-gray-200">
                  There is no data to display
                </h2>
              </div>
            )}
          </TableBody>
        </Table>
        {currentUsers?.length ? (
          <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        ) : (
          " "
        )}
      </div>
    </section>
  );
}
