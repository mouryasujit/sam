// "use client";
// import ClassOwner from "@/Components/ClassOwner";
// import axios from "axios";
// import { useRouter, usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const SingleClass = () => {
//   const router = usePathname();
//   // console.log(router.split("/")[2]);
//   const id = router.split("/")[2];
//   const [tableData, setTableData] = useState([]);

//   console.log(tableData);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const getData = async () => {
//         try {
//           const res = await axios.get(`/api/myclass/${id}`);

//           let datas = res.data?.CLassDetails.students;
//           setTableData(datas);
//         } catch (error) {}
//       };
//       console.log("Tabledata", tableData);
//       getData();
//     }, 10000);
//     return () => clearInterval(intervalId);
//   }, []);
//   return (
//     <>
//       <div className="min-h-screen mx-auto w-full ">
//         <ClassOwner id={id} />
//         <h2 className="text-center font-bold text-2xl my-2  ">
//           Joined students
//         </h2>
//         <table className="w-full">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Rollno</th>
//               <th>Division</th>
//               <th>Joined time</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           {tableData ? (
//             <tbody className="text-center">
//               {Array.isArray(tableData) && tableData.length > 0 ? (
//                 tableData.map((data, index) => (
//                   <tr key={index}>
//                     <td>{data?.name}</td>
//                     <td>{data?.rollno}</td>
//                     <td>{data?.div}</td>
//                     <td>{data?.joinedTime}</td>
//                     <td>{data?.Date}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No data found</td>
//                 </tr>
//               )}
//             </tbody>
//           ) : (
//             <tr>
//               <td colSpan="4">No data found</td>
//             </tr>
//           )}
//         </table>
//       </div>
//     </>
//   );
// };

// export default SingleClass;

"use client";
import ClassOwner from "@/Components/ClassOwner";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleClass = () => {
  const router = usePathname();
  const id = router.split("/")[2];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/myclass/${id}`);
        let datas = res.data?.CLassDetails.students;
        setTableData(datas);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    getData(); // Fetch initial data

    const eventSource = new EventSource(`/api/myclass/${id}/events`);

    eventSource.onmessage = (event) => {
      const newStudent = JSON.parse(event.data);
      setTableData((prevData) => [...prevData, newStudent]);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  return (
    <div className="min-h-screen mx-auto w-full">
      <ClassOwner id={id} />
      <h2 className="text-center font-bold text-2xl my-2">Joined students</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rollno</th>
            <th>Division</th>
            <th>Joined time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((data, index) => (
              <tr key={index}>
                <td>{data?.name}</td>
                <td>{data?.rollno}</td>
                <td>{data?.div}</td>
                <td>{data?.joinedTime}</td>
                <td>{data?.Date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SingleClass;
