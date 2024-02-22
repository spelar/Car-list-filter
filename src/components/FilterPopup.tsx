import styled from "@emotion/styled";
import { FiltersState } from "../pages/ListPage";

export type FilterType = "carType" | "region" | "price";

interface FilterPopupProps {
  filterType: FilterType;
  closePopup: () => void;
  selectedFilters: FiltersState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const FilterPopup = ({
  filterType,
  closePopup,
  selectedFilters,
  setSelectedFilters,
}: FilterPopupProps) => {
  const isActive = (option: string) => {
    return selectedFilters[filterType as keyof FiltersState].includes(option);
  };

  const renderButtons = (options: string[]) => {
    return options.map((option) => (
      <ButtonContainer key={option}>
        <OptionButton
          onClick={() => handleOptionClick(option)}
          className={isActive(option) ? "active" : ""}
        >
          {option}
        </OptionButton>
      </ButtonContainer>
    ));
  };

  const handleOptionClick = (option: string) => {
    if (filterType === "carType") {
      setSelectedFilters((prev) => ({
        ...prev,
        carType: prev.carType.includes(option)
          ? prev.carType.filter((item) => item !== option)
          : [...prev.carType, option],
        tags: prev.tags,
      }));
    } else if (filterType === "region") {
      setSelectedFilters((prev) => ({
        ...prev,
        carType: prev.carType,
        tags: prev.tags,
        region: prev.region.includes(option)
          ? prev.region.filter((item) => item !== option)
          : [...prev.region, option],
      }));
    } else if (filterType === "price") {
      setSelectedFilters((prev) => ({
        ...prev,
        carType: prev.carType,
        tags: prev.tags,
        region: prev.region,
        price: prev.price === option ? "" : option,
      }));
    }
  };

  return (
    <PopupContainer>
      <CloseButton onClick={closePopup}>X</CloseButton>
      {filterType === "carType" &&
        renderButtons(["경형/소형", "준중형", "중형/대형", "수입", "SUV"])}
      {filterType === "region" &&
        renderButtons([
          "서울/경기/인천",
          "제주도",
          "부산/창원",
          "대구/경북",
          "대전",
          "광주",
        ])}
      {filterType === "price" && renderButtons(["낮은 가격순", "높은 가격순"])}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  width: 300px;
  max-height: 80%;
  overflow: auto;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 10px;
  width: calc(50% - 5px);
`;

const OptionButton = styled.button`
  width: 100%;
  &.active {
    color: white;
    background-color: #007bff;
    border-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
  padding: 10px;
  border: none;
  background: none;
  font-size: 1.2em;
  cursor: pointer;
`;

export default FilterPopup;
