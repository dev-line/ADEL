# Migration `20201118173952`

This migration has been generated at 11/18/2020, 6:39:52 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "_CommandsToProducts" DROP CONSTRAINT "_CommandsToProducts_A_fkey"

ALTER TABLE "_CommandsToProducts" DROP CONSTRAINT "_CommandsToProducts_B_fkey"

ALTER TABLE "Commands" ADD COLUMN     "products" TEXT NOT NULL,
ADD COLUMN     "productsId" INTEGER

DROP TABLE "_CommandsToProducts"

ALTER TABLE "Commands" ADD FOREIGN KEY("productsId")REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201011173112..20201118173952
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Users {
   id        Int      @id @default(autoincrement())
@@ -46,9 +46,9 @@
   delivered Boolean    @default(false)
   phone     Int
   address   Int
   gender    String
-  products  Products[]
+  products  String
 }
 model Info {
   id        Int      @id @default(autoincrement())
@@ -60,5 +60,4 @@
   email     String
   address   String
   about     String
 }
-
```


