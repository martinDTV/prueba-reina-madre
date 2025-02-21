import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";
import { LuUser, LuCalendar } from "react-icons/lu";
import { CircularProgress } from "@heroui/progress";
import { useTheme } from "next-themes";
import axios from "axios";
import { useMountEffect } from "@react-hookz/web";

import { useAuth } from "@/context/AuthContext";
import {
  DataCreateDatig,
  DataDoctorApi,
  DataTipoCita,
} from "@/interface/interfaces";

interface Props {
  showModal: (value: boolean) => void;
}

export default function ComponentModal({ showModal }: Props) {
  const { user } = useAuth();
  const [dataTipoCitas, setDataTipoCitas] = useState([]);
  const [dataDoctores, setDataDoctores] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useMountEffect(async () => {
    try {
      const responseTipoCita = await axios.get(
        "http://localhost:8000/rest/v1/tipo-cita/",
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
      const responseDoctores = await axios.get(
        "http://localhost:8000/rest/v1/medicos/",
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      setDataTipoCitas(responseTipoCita.data?.results);
      setDataDoctores(responseDoctores.data?.results);
      setShowContent(true);
    } catch (e) {
      console.error(e);
    }
  });
  const [appointmentData, setAppointmentData] = useState<DataCreateDatig>({
    fecha_hora: "",
    paciente: "",
    tipo_cita: "",
    medico: "",
  });

  const [submitForm, setSubmitForm] = useState(false);
  const [errors, setErrors] = useState<Partial<DataCreateDatig>>({});

  const { theme, systemTheme } = useTheme();
  const tema =
    theme === "dark" || (theme === "system" && systemTheme === "dark")
      ? "dark"
      : "light";
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof DataCreateDatig]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };
  const validateUserData = (): boolean => {
    const newErrors: Partial<DataCreateDatig> = {};

    if (!appointmentData.paciente.trim()) {
      newErrors.paciente = "El nombre del paciente es requerido";
    }
    if (!appointmentData.tipo_cita.trim()) {
      newErrors.tipo_cita = "El tipo de cita es requerido";
    }
    if (!appointmentData.medico.trim()) {
      newErrors.medico = "El nombre del médico es requerido";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateSchedule = (): boolean => {
    const newErrors: Partial<DataCreateDatig> = {};

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitForm(true);
    if (!validateSchedule()) {
      setSubmitForm(false);

      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/rest/v1/citas/",
        appointmentData,
        {
          headers: {
            "Authorization": `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response, 'response')
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setSubmitForm(false);
    }
  };

  // Permite enviar el formulario con la tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");

      if (form) form.requestSubmit();
    }
  };

  return (
    <Modal isOpen={true} size="3xl" onClose={() => showModal(false)}>
      <ModalContent>
        {showContent ? (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Nueva Cita
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
                  className="flex flex-col gap-4"
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
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
                      color={tema === "dark" ? "default" : "primary"}
                      errorMessage={errors.paciente}
                      id="paciente"
                      isInvalid={!!errors.paciente}
                      name="paciente"
                      placeholder="Nombre del paciente"
                      startContent={<LuUser className="pointer-events-none" />}
                      type="text"
                      value={appointmentData.paciente}
                      variant="bordered"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label>Fecha de la Cita</label>
                    <Input
                      color={tema === "dark" ? "default" : "primary"}
                      name="fecha_hora"
                      startContent={
                        <LuCalendar className="pointer-events-none" />
                      }
                      type={"datetime-local"}
                      value={appointmentData.fecha_hora}
                      variant="bordered"
                      onChange={handleChange}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label htmlFor="tipo_cita">Tipo de Cita</label>
                    <Select
                      required
                      color={tema === "dark" ? "default" : "primary"}
                      errorMessage={errors.tipo_cita}
                      id="medico"
                      isInvalid={!!errors.tipo_cita}
                      name="medico"
                      placeholder="Nombre del médico"
                      startContent={<LuUser className="pointer-events-none" />}
                      variant="bordered"
                      onSelectionChange={(key) =>
                        setAppointmentData((prev) => ({
                          ...prev,
                          tipo_cita:
                            dataTipoCitas[
                              parseInt(Array.from(key)[0] as string)
                            ]?.nombre_cita || "",
                        }))
                      }
                    >
                      {dataTipoCitas.map((tipoCita: DataTipoCita, index) => {
                        if (tipoCita.activo) {
                          return (
                            <SelectItem key={index}>
                              {tipoCita.nombre_cita}
                            </SelectItem>
                          );
                        }

                        return null;
                      })}
                    </Select>
                  </motion.div>

                  <motion.div
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                    initial={{ x: -20, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <label htmlFor="medico">Médico</label>
                    <Select
                      required
                      color={tema === "dark" ? "default" : "primary"}
                      errorMessage={errors.medico}
                      id="medico"
                      isInvalid={!!errors.medico}
                      name="medico"
                      placeholder="Nombre del médico"
                      startContent={<LuUser className="pointer-events-none" />}
                      variant="bordered"
                      onSelectionChange={(key) => {
                        setAppointmentData((prev) => ({
                          ...prev,
                          medico:
                            dataDoctores[parseInt(Array.from(key)[0] as string)]
                              ?.nombre_medico || "",
                        }));
                      }}
                    >
                      {dataDoctores.map((doctor: DataDoctorApi, index) => (
                        <SelectItem key={index}>
                          {doctor.nombre_medico}
                        </SelectItem>
                      ))}
                    </Select>
                  </motion.div>
                </motion.div>
              </motion.form>
            </ModalBody>
            <ModalFooter className="flex justify-end gap-2">
              <Button
                color={tema === "dark" ? "default" : "primary"}
                form="appointmentForm"
                isDisabled={submitForm}
                type="submit"
                onPress={() => handleSubmit}
              >
                {submitForm ? (
                  <CircularProgress aria-label="Loading..." size="sm" />
                ) : (
                  "Guardar Cita"
                )}
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <p>Cargando</p>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
