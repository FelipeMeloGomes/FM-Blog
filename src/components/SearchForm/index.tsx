import { Icon } from "../IconComponent";
import { SearchFormProps } from "./types";

const SearchForm = ({ handleSubmit, setQuery }: SearchFormProps) => (
  <form
    className="w-full max-w-xl flex justify-center mb-12 gap-2 search_form"
    onSubmit={handleSubmit}
  >
    <input
      type="text"
      placeholder="Ou busque por tags..."
      className="w-[50%] text-base pl-5 search_form-input"
      alt="Busque por tags"
      onChange={(e) => setQuery(e.target.value.toLowerCase())}
    />
    <button className="btn btn-dark w[100px]" aria-label="Pesquisar">
      <Icon name="Search" className="icon_font" />
    </button>
  </form>
);

export { SearchForm };
