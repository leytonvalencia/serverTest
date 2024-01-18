import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { promisify } from 'util';

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-1"
const bucketName = "upsnet2"
const accessKeyId = "AKIAQRCVFIP2ZR7NQFPT"
const secretAccessKey = "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"

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

const generateSignedUrl = async () => {
    const bytes = await randomBytes(16);
    const imageName = bytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    console.log("URL de AWS  :",signedUrl)
    return signedUrl;
}

export default generateSignedUrl;
