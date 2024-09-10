import { EditButton } from "../EditButton";
import { FormButtonsProps } from "./types";

const FormButtons = ({ response, formError }: FormButtonsProps) => {
  const isResponseLoading = response?.loading === true;

  return (
    <>
      <>
        <br />
      </>
      {!isResponseLoading && (
        <EditButton
          alt="Salvar"
          className="bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm hover:bg-black hover:text-white"
        >
          Salvar
        </EditButton>
      )}
      {isResponseLoading && (
        <EditButton
          alt="Aguarde"
          className="bg-transparent text-black py-3 px-5 rounded border border-black font-medium text-sm cursor-not-allowed opacity-50"
          disabled
        >
          Aguarde...
        </EditButton>
      )}
      {response?.error && <p className="text-red-500">{response.error}</p>}
      {formError && <p className="text-red-500">{formError}</p>}
    </>
  );
};

export { FormButtons };
