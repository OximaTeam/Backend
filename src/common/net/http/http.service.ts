import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { RespStructurizeDto, StructurizeDto } from "./dto/structurize.dto";

@Injectable()
export class HttpServiceCust {
  constructor(private readonly http: HttpService) {}

  async structurizeBlocks(body: StructurizeDto): Promise<RespStructurizeDto> {
    const { data } = await firstValueFrom(
      this.http.post(`${process.env.ML_URL}structurize` || "", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
    return data;
  }
}
