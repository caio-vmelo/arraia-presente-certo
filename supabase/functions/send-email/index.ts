
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID") || "";
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID") || "";
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY") || "";
const EMAILJS_OWNER_TEMPLATE_ID = Deno.env.get("EMAILJS_OWNER_TEMPLATE_ID") || "";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  try {
    const { type, data } = await req.json();
    
    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail e dados são obrigatórios" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    let url = "https://api.emailjs.com/api/v1.0/email/send";
    let emailParams = {};

    if (type === "reservation") {
      emailParams = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: data.recipientEmail,
          from_name: "Chá de Panela Junino",
          to_name: data.senderName,
          gift_name: data.giftName,
          message: `Olá ${data.senderName}, sua reserva do presente "${data.giftName}" foi confirmada!`
        }
      };
    } else if (type === "notification") {
      emailParams = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: "viniciuscaioml@gmail.com",  // Email do proprietário do site
          from_name: data.senderName,
          to_name: "Caio",
          gift_name: data.giftName,
          message: `${data.senderName} (${data.recipientEmail}) reservou o presente "${data.giftName}"`
        }
      };
    } else {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail inválido" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Enviando email com os parâmetros:", JSON.stringify(emailParams));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailParams)
    });

    console.log("Resposta do EmailJS:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na resposta do EmailJS:", errorData);
      throw new Error(`Error sending email: ${errorData}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
