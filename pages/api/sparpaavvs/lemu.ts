import { Client } from 'basic-ftp';
import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const uploadFile = async (path: string, file: File | Blob | Buffer) => {
  try {
    return await fetch(
      `https://storage.bunnycdn.com/codingmoon${path.startsWith('/') ? path : '/' + path}`,
      {
        method: 'PUT',
        body: file,
        headers: {
          AccessKey: '61b4f961-c116-4140-a0e7940a69d5-7c44-4c4c',
        },
      }
    );
  } catch (err) {
    console.log('Upload failed', err);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
  maxDuration: 300,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client();

  try {
    await client.access({
      host: 'integration.lemu.dk',
      user: 'Sanitetskaelderen_Prod',
      password: 'cWRWVMCk2s76L7jC',
      secure: false,
    });
    await client.downloadTo('./lemu.csv', '/FromLEMU/pricat/LM_VVS_SpaarpaaVVS.csv');
    const lemuCsv = readFileSync('./lemu.csv');
    await uploadFile('sparpaavvs/lemu.csv', lemuCsv);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
  res.status(200).json({});
}
