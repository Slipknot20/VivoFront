"use client";
import { Title } from "@/components/Title/Title";
import { IIdName } from "@/types/idName/idName.types";
import { Product, ProductFormValues } from "@/types/products/products.types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DialogeMessage from "../register/DialogeMessage";
import DinamicButton from "@/components/ui/DinamicButton";
import BackText from "@/components/ui/BackText";

export default function UpdateProductForm({
  id,
}: Readonly<{ id: number | undefined }>) {
  const [product, setProduct] = useState<Product>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"ÉXITO" | "ERROR" | "ALERTA">(
    "ÉXITO"
  );
  const [wineries, setWineries] = useState<IIdName[]>([]);
  const [types, setTypes] = useState<IIdName[]>([]);
  const [varieties, setVarieties] = useState<IIdName[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const defaultWineryId =  wineries.map((winery: IIdName) => {
    if (winery.name === product?.nameWinery) {
      setValue("idWinery", winery.id);
    }
    return winery.id
  });
  const defaultTypeId =   types.map((type: IIdName) => {
    if (type.name === product?.nameType) {
      setValue("idType", type.id);
    }
    return type.id
  });
  const defaultVarietyId =   varieties.map((variety: IIdName) => {
    if (variety.name === product?.nameVariety) {
      setValue("idVariety", variety.id);
    }
    return variety.id
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productResponse,
          wineriesResponse,
          typesResponse,
          varietiesResponse,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`
          ).then((res) => res.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/winery/all`
          ).then((res) => res.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`
          ).then((res) => res.json()),
          fetch(
            `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/all`
          ).then((res) => res.json()),
        ]);

        setProduct(productResponse);
        setWineries(wineriesResponse);
        setTypes(typesResponse);
        setVarieties(varietiesResponse);
        console.log(varieties)
        console.log(types)

        setValue("name", productResponse.name);
        setValue("image", productResponse.image);
        setValue("stock", productResponse.stock);
        setValue("price", productResponse.price);
        setValue("year", productResponse.year);
        setValue("description", productResponse.description);

      

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      const { ...payload } = data;

      const response = await fetch(`/api/products/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...payload }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const responseData = await response.json();
      console.log("Producto actualizado:", responseData);
      setDialogType("ÉXITO");
      setDialogMessage("Su producto ha sido actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setDialogType("ERROR");
      setDialogMessage(
        "Su producto no ha podido ser actualizado, por favor revise los datos e intente nuevamente"
      );
    } finally {
      setDialogOpen(true);
    }
  };

  const handleTextAndNumberInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d*\.?\d*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-40 sm:mx-auto">
      <div className="flex direction-row">
        <Title
          title="ACTUALIZAR PRODUCTO"
          color="labelAdminColor"
          letterSpacing="widest"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-md rounded px-20 py-10 my-8 grid gap-4 sm:grid-cols-2 border-primary border-2 bg-backgroundForms"
      >
        {/* name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre del Vino
          </label>
          <input
            {...register(`name`, {
              required: "Este campo es requerido",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres",
              },
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*/,
                message: "Solo se permiten letras, números y espacios",
              },
            })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            type="text"
            defaultValue={product?.name}
            onKeyDown={handleTextAndNumberInput}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        {/* image */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Imagen del producto
          </label>
          <input
            {...register("image", {
              required: "Este campo es requerido",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres",
              },
            })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            type="text"
            defaultValue={product?.image ?? ""}
          />
          {errors.image && (
            <p className="text-red-500 text-xs italic">
              {errors.image.message}
            </p>
          )}
        </div>
        {/* wine type */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="idType"
          >
            Tipo de Vino
          </label>
          <select
            {...register("idType", { required: "Este campo es requerido" })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
         
          >
             <option value="">Selecciona un tipo</option>
                {types.map((type) => (
                    <option
                    key={type.id}
                    value={type.id}
                    selected={type.name === product?.nameType ? true : false}
                    >
                    {type.name}
            </option>
                ))}
          </select>

          {errors.idType && (
            <p className="text-red-500 text-xs italic">
              {errors.idType.message}
            </p>
          )}
        </div>
        {/* wine winnery */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="idWinery"
          >
            Bodega del Vino
          </label>
          <select
            {...register("idWinery", { required: "Este campo es requerido" } )}
        
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
          >
             <option value="">Selecciona una bodega</option>
                {wineries.map((winery) => (
                    <option
                    key={winery.id}
                    value={winery.id}
                    selected={winery.name === product?.nameWinery ? true : false}
                    >
                    {winery.name}
            </option>
                ))}
          </select>

          {errors.idWinery && (
            <p className="text-red-500 text-xs italic">
              {errors.idWinery.message}
            </p>
          )}
        </div>
        {/* grape variety */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="idVariety"
          >
            Variedad de uva
          </label>
          <select
            {...register("idVariety", )}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
      
          >
       
       <option value="">Selecciona una variedad</option>
            {varieties.map((variety) => (
                <option
                key={variety.id}
                value={variety.id}
                selected={variety.name === product?.nameVariety ? true : false}
                >
                {variety.name}
        </option>
            ))}
          </select>
          {errors.idVariety && (
            <p className="text-red-500 text-xs italic">
              {errors.idVariety.message}
            </p>
          )}
        </div>
        {/* stock */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            {...register("stock", {
              required: "Este campo es requerido",
              min: { value: 0, message: "Debe ser al menos 1" },
              maxLength: {
                value: 9,
                message: "Debe tener máximo 9 caracteres",
              },
              pattern: { value: /^\d+$/, message: "Solo se permiten números" },
            })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            type="number"
            defaultValue={product?.stock ?? ""}
            onKeyDown={handleNumberInput}
          />
          {errors.stock && (
            <p className="text-red-500 text-xs italic">
              {errors.stock.message}
            </p>
          )}
        </div>
        {/* price */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Precio
          </label>
          <input
            {...register("price", {
              required: "Este campo es requerido",
              min: { value: 1, message: "Debe ser al menos 1" },
              maxLength: {
                value: 9,
                message: "Debe tener máximo 9 caracteres",
              },
              pattern: {
                value: /^\d*\.?\d*$/,
                message: "Debe ser un número válido",
              },
            })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            type="text"
            defaultValue={product?.price ?? ""}
            onKeyDown={handleNumberInput}
          />
          {errors.price && (
            <p className="text-red-500 text-xs italic">
              {errors.price.message}
            </p>
          )}
        </div>
        {/* year */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="year"
          >
            Año
          </label>
          <input
            {...register("year", {
              required: "Este campo es requerido",
              min: { value: 1, message: "Debe ser al menos 1" },
              maxLength: {
                value: 9,
                message: "Debe tener máximo 9 caracteres",
              },
              pattern: { value: /^\d+$/, message: "Solo se permiten números" },
            })}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            type="number"
            defaultValue={product?.year ?? ""}
            onKeyDown={handleNumberInput}
          />
          {errors.year && (
            <p className="text-red-500 text-xs italic">{errors.year.message}</p>
          )}
        </div>
        {/* description */}
        <div className="mb-4 col-span-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            {...register("description", {
              required: "Este campo es requerido",
              minLength: {
                value: 30,
                message: "Debe tener al menos 20 caracteres",
              },
              maxLength: {
                value: 400,
                message: "Debe tener hasta 200 caracteres",
              },
            })}
            className="h-30 shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
            defaultValue={product?.description ?? ""}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* botón */}
        <div className="flex flex-col col-span-full">
          <div className="flex justify-center">
            <DinamicButton
              bgColor="bg-primary"
              textColor="text-white"
              width="w-2/3"
              borderRadius="rounded-md"
              hoverBgColor="hover:bg-white"
              hoverTextColor="hover:text-primary"
              hoverBorderColor="hover:border-primary"
              className="mb-4 border-2"
            >
              ACTUALIZAR PRODUCTO
            </DinamicButton>
          </div>
          <div className="flex justify-center">
            <BackText
              color="text-gray-700"
              fontSize="text-lg"
              fontWeight="font-semibold"
              underlineWidth="border-b-2"
            />
          </div>
        </div>
      </form>
      <DialogeMessage
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        type={dialogType}
        message={dialogMessage}
        textButtonTwo="Volver a productos"
        buttonTwoHref="/admin/productos"
      />
    </div>
  );
}
