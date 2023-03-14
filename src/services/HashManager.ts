import * as bcript from "bcryptjs";

export class HashManager {
  async hash (plainText: string): Promise<string>{

    const count = Number(process.env.BCRYPT_COST);
    const salt = await bcript.genSalt(count);
    const result = bcript.hash(plainText,salt)

    return result

  }

async compare (plainText: string, cypherText: string): Promise<boolean>{
  return bcript.compare(plainText,cypherText)
  }
}