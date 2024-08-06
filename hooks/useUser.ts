import { BASE_URL } from '@/utils/constants/baseUrl';
import { IUser } from '@/utils/types/Interfaces';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { v4 as uuidv4 } from 'uuid';

const fetcher = (url: string) => {
  const token = localStorage.getItem('token');

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token || '',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }
    return res.json();
  });
};

const updateProfile = async (data: {
  name: string;
  imageId: string;
  password: string;
  slug: string;
  coverId: string;
  description: string;
}) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': localStorage.getItem('token') || '',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};

const useUser = () => {
  const { mutate } = useSWRConfig();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<IUser>(`${BASE_URL}/profile`, fetcher);

  const [isClient, setIsClient] = useState(false); // Track if we are on the client side

  useEffect(() => {
    // Check if we are on the client side
    setIsClient(true);
  }, []);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const { id } = await response.json();
    await updateProfile({
      name: user?.name || '',
      imageId: id,
      password: 'asdasd', // ??????
      slug: user?.slug || '',
      coverId: user?.cover.id || uuidv4(),
      description: user?.description || '',
    });

    mutate(`${BASE_URL}/profile`);
  };

  const uploadCover = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const { id } = await response.json();
    await updateProfile({
      name: user?.name || '',
      imageId: user?.image?.id ?? uuidv4(),
      password: 'asdasd', // ???????
      slug: user?.slug || '',
      coverId: id || uuidv4(),
      description: user?.description || '',
    });

    mutate(`${BASE_URL}/profile`);
  };

  const updateUserInfo = async (data: {
    name: string;
    slug: string;
    description: string;
  }) => {
    await updateProfile({
      name: data.name || user?.name || '',
      imageId: user?.image.id || uuidv4(),
      password: 'asdasd', // ?????
      slug: data.slug || user?.slug || '',
      coverId: user?.cover.id || uuidv4(),
      description: data.description || user?.description || '',
    });
    mutate(`${BASE_URL}/profile`);
  };

  return {
    user,
    isLoading,
    error,
    uploadImage,
    uploadCover,
    updateUserInfo,
  };
};

export default useUser;
