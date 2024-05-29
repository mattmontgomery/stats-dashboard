export default function DebugJson(props: { data: any }) {
  return (
    <pre className="bg-slate-800 text-white p-4 rounded-lg">
      {JSON.stringify(props.data, null, 2)}
    </pre>
  );
}
