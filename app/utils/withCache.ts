import type { AppLoadContext } from "@remix-run/cloudflare";

type CacheOptions = {
    context: AppLoadContext,
    key: string,
}

const revalidationTtl = 60 * 60;
const expirationTtl = revalidationTtl + 60 * 60 * 23;

export async function withCache<T>(fn: () => Promise<T>, {context, key: keyPostfix}: CacheOptions) {
    const kv = context.cloudflare.env.YAMMER_JP_CACHE;
    const key = `v202408251648/${keyPostfix}`
    const cachedStr = await kv.get(key)
    if (!cachedStr) {
        return withStore<T>(fn, {kv, key})
    }

    const cachedObj = JSON.parse(cachedStr) as {v:T, cachedAt: number}
    if (now() - cachedObj.cachedAt > revalidationTtl) {
        context.cloudflare.ctx.waitUntil(
            withStore<T>(fn, {kv, key})
        );
    }
    return cachedObj.v
}

function now() {
    return Date.now() / 1000
}

export async function withStore<T>(fn: () => Promise<T>, {kv, key}: {kv: KVNamespace, key: string}) {
    console.log("withStore", key)
    const res = await fn();
    await kv.put(key, JSON.stringify({v:res, cachedAt: now()}), {expirationTtl});
    console.log("stored", key)
    return res;
}
