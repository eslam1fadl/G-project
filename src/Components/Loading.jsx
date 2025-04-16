import { DNA } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="bg-white absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        color="#199ED3"   
        secondaryColor="#e74c3c" 
        wrapperStyle={{
          animationDuration: "6s",
          animationTimingFunction: "ease-in-out", 
        }}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
