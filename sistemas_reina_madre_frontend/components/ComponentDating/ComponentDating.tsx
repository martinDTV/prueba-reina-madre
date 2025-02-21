import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
} from "@heroui/table";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@heroui/button";
import { useState } from "react";

import { InterfaceDataCitas } from "@/interface/interfaces";
import ComponentModal from "@/components/ComponentsIndexPage/ComponentModal";
import ComponentEditDating from "@/components/ComponentsIndexPage/ComponentEditDating";

interface Props {
  dataCitas: InterfaceDataCitas[];
}

const columns = [
  "Fecha y Hora",
  "Número de Cita",
  "Tipo de Cita",
  "Médico",
  "Acciones",
];

export default function ComponentDating({ dataCitas }: Props) {
  const [showNewDating, setShowNewDating] = useState(false);
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [selectedCita, setSelectedCita] = useState<InterfaceDataCitas | null>(
    null
  );

  const formatearFecha = (fechaISO: string) => {
    const fecha = parseISO(fechaISO);
    return format(fecha, "dd-MM-yyyy 'a las' HH:mm", { locale: es });
  };

  const handleEditClick = (cita: InterfaceDataCitas) => {
    setSelectedCita(cita);
    setShowEditComponent(true);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-row w-full justify-end">
          <Button color={"primary"} onPress={() => setShowNewDating(true)}>
            Agregar Cita
          </Button>
        </div>
        {dataCitas.length > 0 ? (
          <Table>
            <TableHeader>
              {columns.map((column, index) => (
                <TableColumn key={index}>{column}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {dataCitas.map((cita: InterfaceDataCitas, index) => (
                <TableRow key={index}>
                  <TableCell>{formatearFecha(cita.fecha_hora)}</TableCell>
                  <TableCell>{cita.numero_cita}</TableCell>
                  <TableCell>{cita.tipo_cita_nombre}</TableCell>
                  <TableCell>{cita.medico_nombre}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onPress={() => handleEditClick(cita)}
                    >
                      Editar
                    </Button>
                    <Button className="bg-red-500 text-white px-2 py-1 rounded">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No tenemos citas</p>
        )}

        {showNewDating && <ComponentModal showModal={setShowNewDating} />}

        {showEditComponent && selectedCita && (
          <ComponentEditDating
            dataCita={selectedCita}
            showModal={setShowEditComponent}
          />
        )}
      </div>
    </>
  );
}
