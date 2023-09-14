import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: models.find(
          (model) => model.id === e.target.value,
        ) as OpenAIModel,
      });
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Model')}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select a model') || ''}
          value={selectedConversation?.model?.id || defaultModelId}
          onChange={handleChange}
        >
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mt-3 text-left text-neutral-700 dark:text-neutral-400 flex items-center">
        <a
          href="https://pcsdata.baidu.com/thumbnail/f4db020d2ga2fb423be9aba99aa50dbd?fid=4221517777-16051585-1004421406010235&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-090rv9qBgLWi8lq40TenGS%2Fk9FQ%3D&expires=48h&chkv=0&chkbd=0&chkpc=&dp-logid=191205232555075396&dp-callid=0&time=1694689200&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video
"
          target="_blank"
          className="flex items-center"
        >
          <IconExternalLink size={18} className={'inline mr-1'} />
          {t('View Account Usage')}
        </a>
      </div>
    </div>
  );
};
