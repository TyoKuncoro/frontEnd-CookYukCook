"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SelectRole = () => {
  const router = useRouter();
  const moveToStudio = () => {
    router.push("/register-kitchen");
  };
  const moveToTrainee = () => {
    router.push("/register");
  };
  return (
    <div className="flex place-content-center mt-10">
      <div onClick={moveToTrainee}>
        <Image
          className="rounded-l-3xl"
          src="/assets/trainee.png"
          width={500}
          height={650}
          alt="peserta"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div onClick={moveToStudio}>
        <Image
          className=" rounded-r-3xl"
          src="/assets/studio.png"
          width={500}
          height={650}
          alt="kitchen studio"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div>
        <Image
          style={{ bottom: "30px", right: "30px" }}
          className="fixed"
          src="/assets/maskot.png"
          width={150}
          height={150}
          alt="Cook Yuk Cook"
        />
      </div>
    </div>
  );
};

export default SelectRole;
