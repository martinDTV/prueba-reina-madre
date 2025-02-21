import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";

import ComponentDating from "@/components/ComponentDating/ComponentDating";
import { useAuth } from "@/context/AuthContext";

export default function ComponentStart() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [showCitas, setShowCitas] = useState(false);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/rest/v1/citas/",
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          },
        );

        if (response.status === 200) {
          console.log(response.data, "data");
          setCitas(response.data?.results);
          console.log(citas, "citas");
          setShowCitas(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCitas();
  }, []);

  return (
    <>
      {showCitas ? (
        <ComponentDating dataCitas={citas} />
      ) : (
        <div>Cargando.</div>
      )}
    </>
  );
}
