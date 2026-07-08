import { ConfiguratorForm } from '@/components/configurator/ConfiguratorForm';

export default function ConfiguratorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">
        네온사인 맞춤 견적 <span className="text-muted-foreground">(참고용 견적)</span>
      </h1>
      <ConfiguratorForm />
    </main>
  );
}
