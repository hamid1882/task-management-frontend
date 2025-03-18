/* eslint-disable */

import { Navbar } from "@/components/navbar";
import { Divider } from "@heroui/divider";

function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Divider />
      {children}
    </>
  );
}

export default MainTemplate;
