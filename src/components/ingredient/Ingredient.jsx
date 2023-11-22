import { useCallback, useState } from 'react';
import Input from '../input/Input';
import { MdAdd } from 'react-icons/md';
import { ReactComponent as PlusButton } from '../../assets/img/icon-plus.svg'; 
import { styled } from 'styled-components'; 

// Ingredient 컴포넌트 정의
export const Ingredient = ({
  inData,        // 재료 데이터
  formData,      // 양식 데이터
  setFormData,   // 양식 데이터 업데이트 함수
  setIngredientCount,  // 재료 수 업데이트 함수
}) => {
  // 상태 변수를 정의하고 초기화
  const [amount, setAmount] = useState('0');  // 재료 양
  const [ingredient, setIngredient] = useState({});  // 선택된 재료
  const [isButton, setIsButton] = useState(true);  // 버튼 상태
  const [isSelected, setIsSelected] = useState(false);  // 선택 상태

  // 재료 양 입력 필드 변경 처리 함수
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // 드롭다운에서 선택된 재료 변경 처리 함수
  const handleIngredientChange = (event) => {
    const selectedIngredient = inData.ingredients.find(
      (item) => item.name === event.target.value
    );
    setIngredient(selectedIngredient);
  };

  // 제출 핸들러를 useCallback을 사용하여 정의
  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();

      const newIngredient = {
        id: ingredient.id,
        quantity: amount,
        price: ingredient.price,
        unit: ingredient.unit,
      };

      // 양식 데이터 업데이트
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [...prevFormData.ingredients, newIngredient],
      }));

      // 재료 수 업데이트
      setIngredientCount((prevCount) => prevCount + 1);

      // 버튼 비활성화
      setIsButton(false);
    },
    [amount, ingredient, setFormData, setIngredientCount]
  );

  // JSX를 반환
  return (
    <Wrapper>
      <form onSubmit={submitHandler} style={{ fontSize: '20px' }}>
        품목:
        <select
          value={ingredient.name}
          onChange={handleIngredientChange}
          disabled={!isButton}
          selected={!isButton}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
            fontSize: '16px',
            marginLeft: '15px',
            marginRight: '15px',
          }}
        >
          <option disabled selected>
            재료 선택
          </option>
          {inData && inData.ingredients && inData.ingredients.length > 0 ? (
            inData.ingredients.map((res, i) => (
              <option key={i}>{res.name}</option>
            ))
          ) : (
            <option>선택지 없음</option>
          )}
        </select>
        수량:
        <input
          type='number'
          min='0'
          readOnly={!isButton}
          style={{
            height: '20px',
            width: '120px',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
            fontSize: '16px',
            marginLeft: '15px',
            marginRight: '15px',
          }}
          value={amount}
          onChange={handleAmountChange}
        />
        {isButton && <StyledButton type='submit'>추가</StyledButton>}
      </form>
    </Wrapper>
  );
};

// Wrapper 스타일 정의
const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 30px;
  align-items: center;
  margin: 20px 0;
`;

// StyledButton 스타일 정의
const StyledButton = styled.button`
  height: 40px;
  width: 100px;
  color: white;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: var(--main-color);
`;
