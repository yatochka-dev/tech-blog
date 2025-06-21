"use server";

import { getPayload } from "payload";
import config from '@payload-config'


export default async function payload() {
    return await getPayload({ config })
}
