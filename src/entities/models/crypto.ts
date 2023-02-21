import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

/**
 * CryptoAttrs: interface to create new CryptoModel Document
 */
interface CryptoAttrs {
    /**
     * The name of the crypto asset e.g. Bitcoin
     */
    name: string,

    /**
     * The symbol (Short form) representing the crypto e.g. BTC
     */
    symbol: string,

    /**
     * variable to confirm if the blockchain is enabled or disabled
     */
    enabled: boolean,
}

interface CryptoModel extends mongoose.Model<CryptoDoc> {
    build(attrs: CryptoAttrs): CryptoDoc;
}

export interface CryptoDoc extends mongoose.Document {
    name: string,
    symbol: string,
    enabled: boolean,
}

const cryptoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        symbol: {
            type: String,
            required: true,
            unique: true
        },
        enabled: {
            type: Boolean,
            default: false
        }
    },
    {
      toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
      }
    }
);

cryptoSchema.statics.build = (attrs: CryptoAttrs) => {
    return new Crypto(attrs);
};
  
const Crypto = mongoose.model<CryptoDoc, CryptoModel>('Crypto', cryptoSchema);
  
export { Crypto };