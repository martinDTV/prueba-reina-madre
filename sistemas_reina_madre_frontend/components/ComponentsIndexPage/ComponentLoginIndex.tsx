import { motion } from "framer-motion";
import { Card, CardBody, CardHeader } from "@heroui/react";

import { title } from "@/components/primitives";
import ComponentLogin from "@/components/ComponentLogin/ComponentLogin";

export default function ComponentLoginIndex() {
  return (
    <>
      <section className="w-[80%] h-full flex justify-center items-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className=" w-full flex flex-col gap-8"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-[450px] p-6">
              <CardHeader className="flex flex-col content-center">
                <span className={title()}>
                    Iniciar Sesión
                  </span>
              </CardHeader>
              <CardBody className="w-full flex flex-col items-center justify-center">
                <ComponentLogin />
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
