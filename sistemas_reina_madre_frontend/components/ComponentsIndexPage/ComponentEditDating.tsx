import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Select, SelectItem, ModalFooter} from "@heroui/react";
import { motion } from "framer-motion";
import { useMountEffect } from "@react-hookz/web";
import axios from "axios";

import { useAuth } from "@/context/AuthContext";
import { DataDoctorApi, DataTipoCita, InterfaceDataCitas } from "@/interface/interfaces";
import { LuUser } from "react-icons/lu";
import { Button } from "@heroui/button";

interface Props {
  showModal: (value: boolean) => void;
  dataCita: InterfaceDataCitas;
}

export default function ComponentEditDating({ showModal, dataCita }: Props) {
  const { user } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const [dataMedico, setDataMedico] = useState([]);
  const [dataTipoCita, setDataTipoCita] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(dataCita.medico_nombre || "");
  const [selectedTipoCita, setSelectedTipoCita] = useState(dataCita.tipo_cita_nombre || "");

  const [fechaHora, setFechaHora] = useState<string>(dataCita.fecha_hora || "");



  useMountEffect(async () => {
    try {
      const responseDataTipoCita = await axios.get(
        "http://localhost:8000/rest/v1/tipo-cita/",
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      const responseDataMedico = await axios.get(
        "http://localhost:8000/rest/v1/medicos/",
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      console.log(responseDataMedico.data?.results)
      setDataMedico(responseDataMedico.data?.results);
      setDataTipoCita(responseDataTipoCita.data?.results);
      setShowContent(true);
    } catch (e) {
      console.error(e);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tipoCitaId = dataTipoCita.find((tipoCita: DataTipoCita) => tipoCita.nombre_cita === selectedTipoCita)?.nombre_cita;
    const medicoId = dataMedico.find((medico: DataDoctorApi) => medico.nombre_medico === selectedMedico)?.nombre_medico;

    const updatedData = {
      tipo_cita: tipoCitaId,
      medico_nombre: medicoId,
      fecha_hora: fechaHora,
    };

    try {
      const response = await axios.patch(
        `http://localhost:8000/rest/v1/citas/${dataCita.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      console.log("Cita actualizada con éxito", response.data);
      showModal(false);
    } catch (error) {
      console.error("Error al actualizar la cita", error);
    }
  };



  useEffect(() => {
    if (dataMedico.length > 0) {
      setSelectedMedico(dataCita.medico_nombre || "");
    }
    if (dataTipoCita.length > 0) {
      setSelectedTipoCita(dataCita.tipo_cita_nombre || "");
    }
  }, [dataMedico, dataTipoCita, dataCita]);

  return (
    <Modal isOpen={true} size="3xl" onClose={() => showModal(false)}>
      <ModalContent>
        {showContent ? (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar la cita
            </ModalHeader>
            <ModalBody>
              <motion.form
                animate={{ opacity: 1 }}
                id="appointmentForm"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
              >
                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  className="flex flex-col gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label htmlFor="paciente">Paciente</label>
                  <Input
                    required
                    id="paciente"
                    defaultValue={dataCita.paciente}
                    disabled={true}
                    name="paciente"
                    startContent={<LuUser className="pointer-events-none" />}
                    type="text"
                    variant="bordered"
                  />
                </motion.div>
                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  className="flex flex-col gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label htmlFor="numero_cita">Número de Cita</label>
                  <Input
                    required
                    id="numero_cita"
                    defaultValue={dataCita.numero_cita}
                    disabled={true}
                    name="numero_cita"
                    type="text"
                    variant="bordered"
                  />
                </motion.div>
                <motion.div className="flex flex-col gap-2">
                  <label htmlFor="tipo_cita">Tipo de Cita</label>
                  <Select
                    id="tipo_cita"
                    name="tipo_cita"
                    variant="bordered"
                    value={selectedTipoCita}
                    onChange={(e) => setSelectedTipoCita(e.target.value)}
                  >
                    {dataTipoCita.map((tipoCita: DataTipoCita, index) => {
                      if (tipoCita.activo) {
                        return (
                          <SelectItem key={index} value={tipoCita.nombre_cita}>
                            {tipoCita.nombre_cita}
                          </SelectItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </motion.div>
                <motion.div className="flex flex-col gap-2">
                  <label htmlFor="medico">Médico</label>
                  <Select
                    id="medico"
                    name="medico"
                    variant="bordered"
                    value={selectedMedico}
                    onChange={(e) => setSelectedMedico(e.target.value)}
                  >
                    {dataMedico.map((doctor: DataDoctorApi, index) => (
                      <SelectItem key={index} value={doctor.nombre_medico}>
                        {doctor.nombre_medico}
                      </SelectItem>
                    ))}
                  </Select>
                </motion.div>
                <motion.div className="flex flex-col gap-2">
                  <label htmlFor="medico">Fecha Y Hora</label>
                  <Input
                    id="fecha_hora"
                    name="fecha_hora"
                    type={"datetime-local"}
                    variant="bordered"
                  />

                </motion.div>
                <ModalFooter className="flex justify-end gap-2">
                  <Button
                    color={"danger"}
                    onPress={() => showModal(false)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    type="submit"
                    color={"primary"}
                    onPress={() => handleSubmit}
                  >
                    Guardar cambios
                  </Button>
                </ModalFooter>
              </motion.form>
            </ModalBody>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </ModalContent>
    </Modal>
  );
}
