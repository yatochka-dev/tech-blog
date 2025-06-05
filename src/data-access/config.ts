import type { ConfigValueType } from "../../prisma/generated/enums";
import {db} from "~/server/db";



function getConfig() {
    return db.config
}

function setConfig() {

}