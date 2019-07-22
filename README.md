# Descrição

API do IXC.

# Instalação

```
npm install ixc-api --save
```

# Exemplo

```typescript
import IXCAPI from "ixc-api";
let ixc = new IXCAPI("http://ixc.domain", "user", "pass");
let row = await api.selectByID("cliente", 1);
await api.update("cliente", 1, { ...row, razao: "Téstê" });
```
