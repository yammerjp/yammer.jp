import { redirect } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

const githubPagesRepositories = [
    "yammerjp.github.io",
    "scheduled-post",
    "PlayQueue",
    "vue-flying-emoji",
    "TuringMachineOnWeb",
    "gtb20210514-html-form",
];

export function loader({ params }: LoaderFunctionArgs) {

    const { "*": path } = params;

    if (path && githubPagesRepositories.includes(path)) {
        return redirect(`https://yammerjp.github.io/${path}`);
    }

    throw new Response(null, {
        status: 404,
        statusText: "Not Found",
    });
}

export default function RouteComponent() {
    return <></>;
}

