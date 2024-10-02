import { Container } from '@src/components';

export function Footer() {
  return (
    <footer className="py-5">
      <Container>
        <p className="text-[12px] lg:text-[14px] text-center">
          Copyright © FeatherHost {new Date().getFullYear()} - Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
