import { get } from '@vercel/edge-config';
import { Auth } from '@vonage/auth';
import { Vonage } from '@vonage/server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const credentials = new Auth({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

const vonage = new Vonage(credentials, {} as any);

const saveHasSentSms = async () => {
  try {
    const res = await fetch(
      'https://api.vercel.com/v1/edge-config/ecfg_p55ke73fgyrdmfqipaxey0j9z2wt/items?teamId=team_tQFCG2tZEO3TiinRyS5FLosP',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'update',
              key: 'hasSentSms',
              value: true,
            },
          ],
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const projectResponse = await fetch(`https://api.portals.estatetool.net/ac/project2.php?id=29`);
  if (!projectResponse) {
    res.status(500);
    res.send('Cannot scrape');
    return;
  }

  const projects = await projectResponse.json();
  const units = projects?.[0]?.units || 0;
  const hasSentSms = await get('hasSentSms');

  if (!hasSentSms && units > 0) {
    await vonage.sms.send({
      from: '16193754141',
      to: '4521746766',
      text: `Der er ${units} ledig${units > 1 ? 'e' : ''} bolig${
        units > 1 ? 'er' : ''
      } i Bülows Palæ\n\nhttps://juliliving.dk/bulows-palae/`,
    });

    await saveHasSentSms();
  }

  res.status(200).json({ units });
}
