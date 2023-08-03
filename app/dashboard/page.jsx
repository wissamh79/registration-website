import Accepted from "@/components/Accepted";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Attend from "@/components/Attend";
export default async function Dashboard() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <Tabs
        defaultValue="accepted"
        className="flex flex-col items-center justify-center w-full h-full space-y-10"
      >
        <TabsList className="grid w-[30%] grid-cols-2">
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="attend">Attend</TabsTrigger>
        </TabsList>
        <TabsContent
          value="accepted"
          className="flex flex-col items-center justify-center w-full h-full "
        >
          <Accepted />
        </TabsContent>
        <TabsContent
          value="attend"
          className="flex flex-col items-center justify-center w-full h-full"
        >
          <Attend />
        </TabsContent>
      </Tabs>
    </section>
  );
}
