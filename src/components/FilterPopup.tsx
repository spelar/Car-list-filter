import styled from "@emotion/styled";

export type FilterType = "carType" | "region" | "price" | string;

interface FilterPopupProps {
  filterType: FilterType;
  closePopup: () => void;
}

const FilterPopup = ({ filterType, closePopup }: FilterPopupProps) => {
  const renderButtons = (options: string[]) => {
    return options.map((option) => (
      <ButtonContainer key={option}>
        <OptionButton>{option}</OptionButton>
      </ButtonContainer>
    ));
  };

  const renderOptions = () => {
    switch (filterType) {
      case "carType":
        return renderButtons([
          "경형/소형",
          "준중형",
          "중형/대형",
          "수입",
          "SUV",
        ]);
      case "region":
        return renderButtons([
          "서울/경기/인천",
          "제주도",
          "부산/창원",
          "대구/경북",
          "대전",
          "광주",
        ]);
      case "price":
        return renderButtons(["낮은 가격순", "높은 가격순"]);
      default:
        return null;
    }
  };

  return (
    <PopupContainer>
      <CloseButton onClick={closePopup}>X</CloseButton>
      <OptionsContainer>{renderOptions()}</OptionsContainer>
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

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 10px;
  width: calc(50% - 5px);
`;

const OptionButton = styled.button`
  width: 100%;
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
