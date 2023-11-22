import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import Button from '../../components/button/Button';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom, csrfTokenAtom } from '../../atom/Atom';
import PostRecipeAPI from '../../api/form/PostRecipe';
import IngredientsAPI from '../../api/form/IngredientsAPI';
import Loading from '../loading/Loading';
import Input from '../../components/input/Input';
import { Ingredient } from '../../components/ingredient/Ingredient';
import { SectionWrapper } from '../post/Post';
import { FixedIn } from '../../components/ingredient/FixedIn';


function Ingredients() {
  const token = useRecoilValue(accessTokenAtom);
  const CsrfToken = useRecoilValue(csrfTokenAtom);
  const [formData, setFormData] = useState({
    post: {
      title: '',
      content: '',
    },
    ingredients: [],
  });
  const [ingredientCount, setIngredientCount] = useState(1);
  const [inData, setInData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const contents = location.state.contents;

  const getIngredients = IngredientsAPI();
  const postRecipe = PostRecipeAPI(formData, token, CsrfToken);

  const getInApi = async () => {
    const indata = await getIngredients();
    return indata;
  };

  useEffect(() => {
    getInApi().then((res) => {
      setInData(res);
    });
    setFormData((prevData) => ({
      ...prevData,
      post: { ...prevData.post, title: title, content: contents },
    }));
  }, []);

  const saveForm = async () => {
    // 게시글을 저장하는 로직을 추가
    // setFormdata(); 이거 사용헤서 로직 추가
    // form은 name으로 받아온 각 영역의 값을 뜻하는듯함
    postRecipe().then((res) => {
      alert('등록되었습니다!');
      navigate('/posts'); // 저장 후, 게시글 리스트 페이지로 이동(현재는 메인)
    });
  };

  // 서버 응답 확인??

  const prevPage = () => {
    navigate('/posts/form'); // 레시피 등록 페이지로 이동
  };

  return (
    <Wrapper>
      <h2 style={{ marginBottom: '20px' }}>요리 이름: {title}</h2>
      <SectionWrapper style={{ marginBottom: '20px' }}>
        레시피 내용: {contents}
      </SectionWrapper>

      <h2 style={{ marginBottom: '10px' }}>재료를 등록해주세요</h2>
      <section style={{ minHeight: '30vh' }}>
        {[...Array(ingredientCount)].map((_, index) => (
          <Ingredient
            key={index}
            inData={inData}
            formData
            setFormData={setFormData}
            setIngredientCount={setIngredientCount}
          />
        ))}
      </section>
      <ButtonWrapper>
        <Button onClick={prevPage} content='이전' />
        <Button onClick={saveForm} content='저장' />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  min-height: 50vh;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 50px;
  bottom: 0;
  justify-content: center;
`;

export default Ingredients;