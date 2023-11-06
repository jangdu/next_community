import InputGroup from '@/components/InputGroup';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';

export default function CommunityCreate() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        '/communities',
        { name, title, description },
        { withCredentials: true },
      );

      alert(`${res.data.name} 카테고리 생성이 완료되었습니다.`);
    } catch (error: any) {
      console.error(error);
      if ('response' in error && error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({});
      }
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white mt-8 rounded-lg border shadow-lg">
      <div className="w-10/12 mx-auto md:w-96 py-16">
        <h1 className="mb-2 text-lg font-medium">카테고리 생성하기</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <p className="font-medium">카테고리 명</p>
            <p className="mb-2 text-xs text-gray-400">
              커뮤티니는 소문자로만 생성 할 수 있습니다.
            </p>
            <InputGroup
              placeholder="카테고리 명"
              value={name}
              setValue={setName}
              error={errors.name}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">카테고리 제목</p>
            <p className="mb-2 text-xs text-gray-400">
              카테고리의 주가되는 주제로, 언제든지 변경이 가능합니다.
            </p>
            <InputGroup
              placeholder="카테고리 주제"
              value={title}
              setValue={setTitle}
              error={errors.title}
            />
          </div>
          <div className="my-6">
            <p className="font-medium">카테고리 설명</p>
            <p className="mb-2 text-xs text-gray-400">
              카테고리에 대한 설명을 작성해주세요
            </p>
            <InputGroup
              placeholder="카테고리 설명"
              value={description}
              setValue={setDescription}
              error={errors.description}
            />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 text-sm font-semibold rounded-md text-white bg-gray-500">
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
