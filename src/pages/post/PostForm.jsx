import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

function PostForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    contents: '',
  });

  const { title, contents } = form;

  const onChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const nextPage = () => {
    const sanitizedContents = stripHtmlTags(contents);
    console.log(sanitizedContents);
    navigate('/posts/form/ingre', {
      state: {
        title: title,
        contents: sanitizedContents,
      },
    });
  };

  // 페이지 새로고침 혹은 창닫기 시도시 경고 메세지 출력
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        '변경사항이 저장되지 않을 수 있습니다. 정말 페이지를 나가시겠습니까?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className='recipebox'>
        <h1 style={{ fontWeight: 'bold' }}>레시피 등록</h1>
        <hr />
        <Input
          type='text'
          name='title'
          value={title}
          width='70%'
          placeholder='요리 이름'
          onChange={(e) => onChange('title', e.target.value)}
          labelHidden={true}
          style={{
            border: '3px solid black',
            left: '5px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--main-color)')}
          onBlur={(e) => (e.target.style.borderColor = 'black')}
        />
        <h3>레시피 내용</h3>
        <div
          style={{ marginBottom: '30px', marginTop: '10px' }}
          sx={{
            '  .ql-editor': {
              padding: '30px',
              boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
              margin: '2px',
              width: '100%',
              maxHeight: '75vh',
              minHeight: '75vh',
              backgroundColor: 'white',
            },
          }}
        >
          <ReactQuill
            value={contents}
            onChange={(value) => onChange('contents', value)}
            style={{ height: '300px' }}
          />
        </div>
        <Button
          onClick={nextPage}
          content='다음'
          style={{ marginTop: '100px' }}
        />
      </div>
    </>
  );
}

function stripHtmlTags(html) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}

export default PostForm;
