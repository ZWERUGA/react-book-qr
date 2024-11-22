import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { profileSchema } from "../zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Loader as ButtonLoader } from "lucide-react";
import Loader from "@/components/loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Profile() {
  const imageInput = useRef<HTMLInputElement>(null);
  const { currentUser, isLoading: currentUserLoading } = useCurrentUser();
  const [imagePreview, setImagePreview] = useState(currentUser?.imageUrl);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const update = useMutation(api.users.update);
  const deleteImage = useMutation(api.upload.deleteById);
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name,
    },
  });

  const avatarFallback = currentUser?.name?.charAt(0).toUpperCase();

  useEffect(() => {
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  if (currentUserLoading) {
    return (
      <div className="flex justify-center items-center h-full absolute top-0 right-0 left-0 bottom-0">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return <div>Пользователь не найден...</div>;
  }

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      setLoading(true);

      let storageId = currentUser.image;

      if (selectedImage) {
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
        });

        if (!result.ok) {
          throw new Error("Ошибка загрузки изображения");
        }

        if (storageId) {
          deleteImage({ storageId });
        }

        const body = await result.json();
        storageId = body.storageId;

        setSelectedImage(null);
        imageInput.current!.value = "";
      }

      await update({
        image: storageId,
        name: values.name,
      });

      toast({
        title: "Обновление профиля",
        description: "Профиль успешно обновлен",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      toast({
        title: "Загрузка изображения",
        description: "Ошибка загрузки изображения",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1>Информация о профиле</h1>
        <span className="text-xs text-slate-500">
          Дата создания: {format(currentUser._creationTime ?? "", "dd.MM.yyyy")}
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 border w-full md:w-[520px] p-2 rounded-md"
        >
          <FormField
            name="image"
            render={() => (
              <FormItem className="space-y-1">
                <FormLabel>
                  <div className="flex items-center justify-between gap-x-2 h-4">
                    Изображение
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="flex gap-x-2 items-center">
                    <Input
                      type="file"
                      accept="image/*"
                      ref={imageInput}
                      onChange={(e) => setSelectedImage(e.target.files![0])}
                      disabled={selectedImage !== null}
                    />
                    <div>
                      <Avatar className="flex items-center justify-center">
                        <AvatarImage
                          src={imagePreview || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-xl">
                          {avatarFallback}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  <div className="flex items-center justify-between gap-x-2 h-4">
                    Имя пользователя
                    {!form.getValues().name && (
                      <span className="text-xs text-red-400">
                        (не указано...)
                      </span>
                    )}
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Имя пользователя..."
                    className="text-xs sm:text-base"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mt-1" />

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  <div className="flex justify-between items-center">
                    Электронная почта
                    <span className="text-xs text-slate-500">
                      (только для просмотра)
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="text-xs sm:text-base"
                    readOnly
                    disabled
                    {...field}
                    value={currentUser.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  <div className="flex justify-between items-center">
                    Статус
                    <span className="text-xs text-slate-500">
                      (только для просмотра)
                    </span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="text-xs sm:text-base"
                    readOnly
                    disabled
                    {...field}
                    value={
                      currentUser.role === "user" ? "Читатель" : "Библиотекарь"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mt-1" />
          <Button disabled={isLoading} type="submit" className="mt-1">
            {isLoading && <ButtonLoader className="animate-spin" />}
            {isLoading ? "Подождите..." : "Продолжить"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
