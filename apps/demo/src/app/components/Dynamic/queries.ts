import { useQuery } from '@tanstack/react-query';
import { getClassTypes, getLimits } from './services';

export const useGetClassTypes = () => {
  return useQuery(['classTypes'], getClassTypes, {
    select: (data) =>
      data.map((item: { name: string; id: string }) => ({
        label: item.name,
        value: item.id,
      })),
  });
};

export const useGetLimits = (classType: string) => {
  return useQuery([classType], () => getLimits(classType), {
    enabled: !!classType,
    select: (data) =>
      data.map((item: string) => ({
        label: item,
        value: item,
      })),
  });
};
